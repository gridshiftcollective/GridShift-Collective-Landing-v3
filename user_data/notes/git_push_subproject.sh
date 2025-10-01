#!/bin/bash
set -e

# Simple push script for GridShift repo (not submodule-aware)
REPO_DIR="/home/GridShift-Collective-Landing-v3"
PAT_FILE="$(dirname "$(readlink -f "$0")")/.github_pat"
GITHUB_PAT=
if [ -f "$PAT_FILE" ]; then
  GITHUB_PAT=$(head -n1 "$PAT_FILE" | tr -d '\r\n')
fi

BRANCH="${1:-main}"
COMMIT_MSG="${2:-autocommit}"
REMOTE="${3:-origin}"

if [ -z "$BRANCH" ]; then
  echo "Usage: $0 <branch> [commit_message] [remote]"
  exit 1
fi

cd "$REPO_DIR" || { echo "Repo not found: $REPO_DIR"; exit 1; }

echo "Staging changes..."
git add -A

# If PAT present, create temporary askpass so git commands are non-interactive
if [ -n "$GITHUB_PAT" ]; then
  ASKPASS=$(mktemp)
  cat > "$ASKPASS" <<'EOF'
#!/bin/sh
printf '%s' "$GITHUB_PAT"
EOF
  chmod 700 "$ASKPASS"
  export GIT_ASKPASS="$ASKPASS"
  export GIT_TERMINAL_PROMPT=0
fi
trap 'if [ -n "${ASKPASS:-}" ] && [ -f "${ASKPASS}" ]; then rm -f "${ASKPASS}"; fi' EXIT

echo "Committing (if needed)..."
if git diff-index --quiet HEAD --; then
  echo "No changes to commit."
else
  git commit -m "$COMMIT_MSG"
fi

echo "Pushing to $REMOTE $BRANCH..."
git push "$REMOTE" "$BRANCH" 2>push_error.log || true

if [ -s push_error.log ]; then
  if grep -qiE "authentication failed|invalid username or token|write access to repository not granted|403" push_error.log; then
    echo "Authentication error during push. Make sure the token in $PAT_FILE has write access and the account has push rights.";
  fi
  sed -n '1,200p' push_error.log
  rm -f push_error.log
  exit 1
else
  echo "Push succeeded."
fi