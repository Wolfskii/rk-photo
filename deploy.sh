#!/bin/sh
git subtree push --prefix server origin server
echo "Server deployed!"

#!/usr/bin/env node
(cd client && npm run deploy);

