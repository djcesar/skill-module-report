#!/usr/bin/env bash
# Sample project inside a git repository with an existing .gitignore and one initial commit.
set -eu
cp -R "$(dirname "$0")/../fixtures/club-bookings/." .
printf 'node_modules/\ndist/\n.env\n' > .gitignore
git init -q
git add -A
git -c user.name=test -c user.email=test@example.com commit -q -m "Initial project"
