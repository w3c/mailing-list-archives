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

## Background

W3C uses
[hypermail](https://github.com/hypermail-project/hypermail) to
manage its archives, and while we could consider switching to
something else, doing so would be quite disruptive so it seems
unlikely to happen. (though that is [up for
discussion](https://github.com/w3c/mailing-list-archives/issues/8))

We would like to improve the markup of our hypermail-generated
archives, and possibly add a few extra features on top of that
using javascript libraries that can evolve independently from
hypermail's basic output.

## How to contribute

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
  [@gosko](/gosko)'s
  [proposal](https://w3c.github.io/mailing-list-archives/samples/message-proposal-1.html)
  includes a sample of what this might look like.
- radical proposals for better archive UIs: in addition to simple
  markup fixes we should consider what usability improvements we
  can make by adding more advanced features, even if they prove
  to be infeasible. Upvote/downvote features? Inline textareas
  for responses? Please [submit any ideas](../../issues/) you might have!

### Javascript code

We could also use some javascript code contributions to provide more advanced
functionality, such as:

- retrieving, parsing and displaying [a message's thread
  structure](../../issues/2) in a useful way.
- code to show or hide the thread structure along with a message.
- code to switch to/from a flattened view of a message thread.
- code to [intelligently prettify an email
  message](https://github.com/w3c/mailing-list-archives/issues/1#issuecomment-173371579)
  (switch to proportional font, judiciously hide quoted text,
  allow quoted text to be toggled visible/invisible)
- code to allow for efficient navigation of message threads
  using simple keystrokes a la gmail.

### Discuss open issues

W3C staff and collaborators are welcome to give their opinions on
the [open issues within this repository](../../issues), including
topics such as:

- [should we continue to use
  hypermail?](https://github.com/w3c/mailing-list-archives/issues/8)
- [what should archived messages look like by
  default?](https://github.com/w3c/mailing-list-archives/issues/1)
- [what is the best way to integrate a flattened view of message
  threads?](https://github.com/w3c/mailing-list-archives/issues/9)
- [should we add some kind of thread navigation
  widget?](https://github.com/w3c/mailing-list-archives/issues/2)

Feel free to [raise new
issues](https://github.com/w3c/mailing-list-archives/issues)
related to our archives as well.

See also [proposed improvements to the mailing lists archives (2002/2003)](https://www.w3.org/2002/03/archives-improvements/).
