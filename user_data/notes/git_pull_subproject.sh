#!/bin/bash
set -e

# Simple pull script for GridShift repo
REPO_DIR="/home/GridShift-Collective-Landing-v3"
PAT_FILE="$(dirname "$(readlink -f "$0")")/.github_pat"
GITHUB_PAT=
if [ -f "$PAT_FILE" ]; then
  GITHUB_PAT=$(head -n1 "$PAT_FILE" | tr -d '\r\n')
fi

BRANCH="${1:-main}"
REMOTE="${2:-origin}"

if [ -z "$BRANCH" ]; then
  echo "Usage: $0 <branch> [remote]"
  exit 1
fi

cd "$REPO_DIR" || { echo "Repo not found: $REPO_DIR"; exit 1; }

echo "Fetching latest changes from $REMOTE..."

# If PAT present, use credential helper for authentication
if [ -n "$GITHUB_PAT" ]; then
  echo "Using PAT from $PAT_FILE for this fetch/pull (temporary credential helper)."
  git -c credential.helper="!f() { echo username=\"x-access-token\"; echo password=\"$GITHUB_PAT\"; }; f" \
      fetch $REMOTE 2>fetch_error.log
  FETCH_STATUS=$?
else
  git fetch $REMOTE 2>fetch_error.log
  FETCH_STATUS=$?
fi

if [ $FETCH_STATUS -ne 0 ]; then
  if grep -q "Authentication failed" fetch_error.log || grep -q "Repository not found" fetch_error.log; then
    echo "Authentication error during fetch. Make sure the token in $PAT_FILE has read access and the account has pull rights.";
  fi
  sed -n '1,200p' fetch_error.log
  rm -f fetch_error.log
  exit 1
fi
rm -f fetch_error.log

echo "Checking out and pulling branch '$BRANCH'..."
git checkout "$BRANCH" 2>/dev/null || git checkout -b "$BRANCH" "$REMOTE/$BRANCH"
git pull "$REMOTE" "$BRANCH"

echo "Pull completed successfully."