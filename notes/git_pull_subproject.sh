#!/bin/bash
set -e # Exit immediately if a command exits with a non-zero status.

# --- Configuration ---
REPO_DIR="/home/GridShift-Collective-Landing-v2"
# Read PAT from .github_pat alongside this notes folder
PAT_FILE="$(dirname "$0")/.github_pat"
GITHUB_PAT=
if [ -f "$PAT_FILE" ]; then
    GITHUB_PAT=$(head -n 1 "$PAT_FILE" | tr -d '\r\n')
fi


# Usage: ./git_pull_subproject.sh <branch> <remote>
# Example: ./git_pull_subproject.sh develop origin

BRANCH="${1:-main}"
REMOTE="${2:-origin}"

if [ -z "$BRANCH" ]; then
    echo "Error: Branch name not provided."
    echo "Usage: $0 <branch> [remote]"
    exit 1
fi

cd "$REPO_DIR" || { echo "Error: Repository directory $REPO_DIR not found."; exit 1; }

# If .github_pat exists, use it only for this pull via a one-off credential helper
if [ -n "$GITHUB_PAT" ]; then
    echo "Using PAT from $PAT_FILE for this fetch/pull (temporary credential helper)."
    git -c credential.helper="!f() { echo username=\"x-access-token\"; echo password=\"$GITHUB_PAT\"; }; f" \
        fetch $REMOTE 2>fetch_error.log
    FETCH_STATUS=$?
else
    git fetch $REMOTE 2>fetch_error.log
    FETCH_STATUS=$?
fi

echo "Fetching latest changes from $REMOTE..."
git fetch $REMOTE 2>fetch_error.log
FETCH_STATUS=$?
if [ $FETCH_STATUS -ne 0 ]; then
    if grep -q "Authentication failed" fetch_error.log || grep -q "Repository not found" fetch_error.log; then
        echo "Error: Authentication failed when fetching from $REMOTE."
        echo "Please check your git credentials or GITHUB_PAT."
        rm -f fetch_error.log
        exit 1
    else
        cat fetch_error.log
        rm -f fetch_error.log
        echo "Error: Failed to fetch from $REMOTE."
        exit 1
    fi
fi
rm -f fetch_error.log

echo "Checking out and pulling branch '$BRANCH' in submodule..."
git checkout "$BRANCH" || git checkout -b "$BRANCH" "$REMOTE/$BRANCH"
git pull $REMOTE "$BRANCH"

echo "Staging ALL changes in submodule (including deletions)..."
git add -A

echo "Committing any local changes in submodule (if present)..."
if git diff-index --quiet HEAD --; then
  echo "No local changes to commit in submodule after pull."
else
  git commit -m "Sync local submodule after pull from remote"
fi

echo "--- Processing Main Repository: $MAIN_REPO_DIR ---"
cd "$MAIN_REPO_DIR"

echo "Staging submodule update in main repository..."
git add "user_data/Subproject-HMM"

echo "Checking for submodule pointer changes to commit in main repository..."
if git diff-index --quiet --cached HEAD -- "user_data/Subproject-HMM"; then
  echo "No submodule pointer changes to commit in main repository (already up-to-date with local submodule state)."
else
  echo "Committing submodule update in main repository with message: 'Update Subproject-HMM from remote branch: $BRANCH'"
  git commit -m "Update Subproject-HMM from remote branch: $BRANCH"
fi

echo "Pushing main repository changes..."
git push $REMOTE

echo "--- Pull Operations Complete ---"