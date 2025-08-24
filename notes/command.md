# Sessions
tmux new -s Ali2
tmux attach -t Ali2
tmux attach -t Ali1

# File Size
du -sh /home/freqtrade/user_data/Subproject-HMM/.venv

# Git
./notes/git_push_subproject.sh main "Update Files" origin
./notes/git_pull_subproject.sh develop origin

# Gemini
npm cache clean --force && npm install -g @google/gemini-cli
npm install -g @google/gemini-cli
export GOOGLE_CLOUD_PROJECT=sonic-bot-466615 && gemini