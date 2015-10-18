# Modern Mailing List Archives

This repository is used to experiment with various approaches to
modernizing W3C's mailing list archives.

Goals include:

  - improve readability of default styles (incl. proportional fonts)
  - improve usability on mobile devices
  - provide a thread view that spans hypermail's period boundaries
  - provide a flattened view of message threads (all messages on one page)
  - preserve the stable URIs for messages in W3C's existing archives

## Possible approaches

### Revolutionary

One possibility would be to try installing more modern archive
software such as ES Discuss or hyperkitty.

[ES Discuss](https://esdiscuss.org/) looks OK but doesn't seem to have a lot of thought put
into its URIs: lists of messages are only separated into "page
1", "page 2" with the page contents changing over time, and
thread URIs are based on the subjects of the threads -- what
happens when there are dozens of threads with the same subject
over the lifetime of a list?

[Hyperkitty](https://hyperkitty.readthedocs.org/en/latest/) seems more promising and by default seems very close
to what we want, e.g [Fedora users archives](https://lists.stg.fedoraproject.org/archives/list/users%40lists.fedoraproject.org/)

It would be good to try installing it with a few of our lists to
get some experience with it and see how well it meets our needs.
But switching to that would be a pretty revolutionary change,
with a completely separate URI space for all our archives.

### Evolutionary

Another approach that a few people on the team have experimented
with are thread flatteners that display a thread on one page
using our existing archives as input.

Richard's ["Flatten me" service](http://www.w3.org/Mail/flatten/)
is the best of these that I have seen. One unknown about this
service is how well it would scale up to more lists and more
usage given that it uses [MASE](http://www.w3.org/Search/Mail/Devel) to retrieve info about threads.

One thing that might be helpful for services like Flatten me
would be if we exposed info about our message threads as json
objects in an efficient way. This should be fairly easy to add to
hypermail, or as a separate tool that pokes around hypermail's
output and generates json. This would allow us to experiment with
alternative views of message threads much more easily.

Having something like that would also make it easy to add a js
widget to our archives that would display a little thread
navigation panel at the top right or somewhere -- this could be
toggleable on/off and would allow for better views of threads
that span archive period boundaries. This js widget could also
include a link to the flattened version of the thread.

Whatever we come up with as a more modern version of our
archives, there will be some people who hate it and prefer the
other version (flattened or not), so it might be good to make
that a per-user preference, stored in a browser cookie or
localStorage. That way people who prefer flat views would always
see them, and those that don't will never see them. (and no need
for a duplicate URI space, and getting annoyed when someone sends
you a pointer to a view of the archives that you despise.)

## Next steps

A few specific things I think we should do next:

  - [expose info about message threads as json objects](../../issues/2)

  - add a reference to a javascript library to each of our
    archive pages, to allow for experimenting with things like
    a thread widget and a thread flattener.

  - in parallel, [start working on improving the default
    style of our archives](../../issues/1).

  - install hyperkitty somewhere to get some experience with it.
