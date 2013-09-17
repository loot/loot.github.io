### Guidelines

* In communication, it's probably best to use your Bethsoft Forum name since we all know each other by the aliases from the forum.
* Only make edits/additions you're confident about - otherwise discuss on the Bethsoft forum threads or via Private Message.
* Check out the masterlists and become familiar with the comments and categorisations therein. See the Metadata Syntax HTML file in the boss-code repository for the details.
* Make as many silent comments as you want within the masterlists - it doesn't hurt (within reason).
* Use blank lines to separate mods that are grouped together or where it helps readability.
* Test your changes before uploading them, to make sure you didn't make any syntax typos. This is best done by running your edited masterlist through BOSS - make sure to first disable masterlist updating though!
* If you add a non-standard message and can't translate it yourself (don't just run it through Google Translate or similar), then create an issue in the masterlist repository's issue track about it, so that someone else can see it needs translating and do it for you.
* Have as much fun as humanly possible editing a text file... (er, yeah, right!)

### Adding Bash Tags

Before adding a tag to a mod, it is recommended that you:

1. Check the mod in TES4Edit or equivalent to see if it does actually require that tag.
2. Think about the nature of the mod, is it designed so that it is OK if things get overriden, or will it malfunction if that occurs?
3. Read the mod documentation and the mod description field in Wrye Bash to check whether the mod author has supplied any tags with it, or recommended any to be added.

That should ensure you have the correct information, so you can start to add the necessary tags. Use the Wrye Bash/Flash/Flash NV readme as a reference.

### Policies

As time goes by, we sometimes find it's good to have rules written down for things relating to how we operate. This is where we write these rules. Please don't change them without prior discussion.

#### Plugin Addition

It's pretty simple: if a plugin is, or will shortly be (eg. author giving heads-up about imminent release), publicly available for download, it is eligible for addition to the appropriate masterlist.

Plugins that are not available to the public are not suitable for inclusion in the masterlist - if someone reports such a plugin, tell them that it is more appropriate for them to add any necessary metadata using a userlist rule. Such cases include private beta plugins, or more generally plugins distributed amongst a select group of people, or plugins for which you have to pay to access (which is against Bethesda's rules, but has undoubtedly happened before).

#### Link Requesting

Sometimes it is necessary for a BOSS committer to download a plugin to investigate it, eg. to double-check information provided by a user. In such cases, we generally ask the user to provide a link to the plugin in question. However, because most of BOSS's submitting activity occurs on Bethesda's official forums, we have to abide by their rules. These rules include not linking to nude mods, for instance, and not discussing certain mods that break their rules (eg. Morroblivion).

If a user submits a plugin that falls into such a catagory and they provide a link, ask them to remove it, stating why. It's best not to draw negative moderator attention to BOSS's threads, because we need them to stay open. (Moderators are highly unlikely to lock the thread or get on to us about such cases, but better safe than sorry, plus you educate users that may have been unaware of the rules.)

If a user submits a plugin that falls into such a catagory and they don't provide a link, ask them to PM you a link to the plugin.

#### Membership Removal

This covers removing an individual from the BOSS team purely due to inactivity on their part. We haven't yet needed a policy for removing team members otherwise.

To avoid bloating the BOSS team membership and reducing the potential security risk a large member count represents, individuals can be removed from the BOSS team if they have made no contributions to the masterlists. There are two cases for this:

* If a newly-added member does not make any commits within the first month of their membership being awarded, they can be removed without credit.
* If a member does not make any commits within the most recent two calendar months (ie. it's not a rolling check, just once a month), they can be removed with credit.

In either case, an email should be sent to the member's given email address containing the following notification:

> You've been removed from the BOSS team membership according to our membership removal policy (see our Guidelines wiki page for details). If you wish to contribute again in future please contact a BOSS admin saying so and you will be reinstated.

For removal "with credit", this means that they remain credited as a BOSS team member in the BOSS readme, but are marked as inactive.

Member activity is most easily checked by scrolling back through the commit history and making a list of the authors displayed. Anyone not listed has been inactive.

Note: Admins are exempt from this policy, for a couple of reasons:

* They might be active, just not in masterlist maintenance.
* They act as safety-nets for the project, in case the active membership disappears. An otherwise inactive admin can step in and get the ball rolling again.