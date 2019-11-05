---
title: Some handy git aliases
slug: git-bash-aliases
techs: ["Git"]
date: "2019-11-05"
---

This is a list of git aliases I commonly use, mainly this is just a reference for myself for when I change computers or when someone sees me typing them and wants to know more.

```bash
alias g="git"
alias ga="git add ."
alias gap="git add -p"
alias gb="git checkout -b"
alias gc="git commit"
# Copies the current branch to the clipboard - "git copy branch"
alias gcb="git branch | grep \* | cut -d ' ' -f2 | tr -d '\012' | pbcopy"
alias gch="git checkout"
alias gf="git fetch"
# Copies previous commit hash - "git last"
alias gl="git rev-parse HEAD | pbcopy"
alias gph="git push"
alias gpl="git pull"
alias gpm="git pull origin master"
alias gs="git status"
# Deletes all branches locally that have been merged into the current branch
alias deleteMergedBranches='git branch --merged | grep -v "\*" | grep -v master | grep -v dev | xargs -n 1 git branch -d'
```

If you have any more along these lines [let me know](https://twitter.com/sam__dawson).
