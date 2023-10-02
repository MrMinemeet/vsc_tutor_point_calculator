#!/bin/bash

# Lint before
npx eslint . &&
# && makes vsce only execute if eslint was successful


# Build to vsix
vsce package