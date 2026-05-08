# Computing time differences

from datetime import datetime, timedelta
now = datetime.now()
then = datetime(2016,5,23)
delta = now-then
print(delta.days)
print(delta.seconds)