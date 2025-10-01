# Sessions
tmux new -s Ali2
tmux attach -t Ali2
tmux attach -t Ali1

# NPM
npm run dev

# File Size
du -sh /home/freqtrade/user_data/Subproject-HMM/.venv

# Git
user_data/notes/git_push_subproject.sh main "Update Files" origin
user_data/notes/git_pull_subproject.sh main origin

# Gemini
npm cache clean --force && npm install -g @google/gemini-cli
npm install -g @google/gemini-cli
export GOOGLE_CLOUD_PROJECT=sonic-bot-466615 && gemini