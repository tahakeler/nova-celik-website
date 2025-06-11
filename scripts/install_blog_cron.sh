#!/bin/sh
# Schedule blog generation daily at noon
CRON_LINE="0 12 * * * cd $(dirname $0)/.. && /usr/bin/python3 scripts/generate_blogs.py >> logs/cron.log 2>&1"
# Add cron entry if not already present
(crontab -l 2>/dev/null | grep -F "$CRON_LINE") >/dev/null 2>&1 || (
  (crontab -l 2>/dev/null; echo "$CRON_LINE") | crontab -
  echo "Cron job installed: $CRON_LINE"
)
