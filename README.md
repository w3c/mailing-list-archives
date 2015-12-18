# Modern Mailing List Archives

This repository is used to experiment with various approaches to
modernizing W3C's mailing list archives.

Goals include:

  - improve readability of default styles (incl. proportional fonts)
  - improve usability on mobile devices
  - provide a thread view that spans hypermail's period boundaries
  - provide a flattened view of message threads (all messages on one page)
  - preserve the stable URIs for messages in W3C's existing archives

See [How to contribute](#how-to-contribute) below for how to
contribute to this project.

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

## How to contribute

Please make use of the [`.editorconfig`](./.editorconfig) file in your editor to keep our code formatting consistent.

### Style/markup improvements

We could use contributions in a number of areas:

- [simple markup improvements to the current archives](../../issues/1):
  HTML5, mobile-friendly; think non-controversial changes. This is
  tracked/discussed as [issue #1](../../issues/1). Existing proposals:

  * [a mockup of an updated message
    page](https://w3c.github.io/mailing-list-archives/samples/message-proposal-1.html)
    from @[gosko](/gosko)
  * _your proposal goes here!_

- markup to display the structure of a message thread along with
  a message. This needs to work well with threads that contain
  anywhere from 3 messages to 200 messages or more. (but probably
  best to optimize for 5-20 or so)

- radical proposals for better archive UIs: in addition to simple
  markup fixes we should consider what usability improvements we
  can make by adding more advanced features, even if they prove
  to be infeasible. Upvote/downvote features? Inline textareas
  for responses? Please [submit any ideas](../../issues/) you might have!

### Javascript code

We could also use some javascript code contributions to provide more advanced
functionality, such as:

- retrieving, parsing and displaying [JSON thread info](../../issues/2)
  pertaining to a message in our archives.

- code to show or hide the thread structure along with a message.

- code to switch to/from a flattened view of a message thread.

- code to allow for efficient navigation of a message thread
  using simple keystrokes a la gmail.

- code to allow people to opt-in to using experimental versions
  of our archives, so we can get feedback from a wide variety of
  users without disrupting existing usage. (as discussed in the
  [Evolutionary](#evolutionary) section above)
