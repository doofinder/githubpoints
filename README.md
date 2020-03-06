# githubpoints

A WebExtension to make some point accounting on GitHub in a SCRUM style.

## Deployment instructions

### Firefox Extension

Package the project into a `.zip` removing `.git` directory and other
development files. On Linux and MacOS you can do:

```
$ zip -r -FS ../githubpoints-x.x.x.zip * --exclude *.git*
```

That will create a compressed file. Now you can go to your Firefox
Developer Account and either create a new extension if you haven't
already (if you create one, remember to not make it public in the
options!) , or update the existing one (probably it's not your first
time doing this then). Upload the file and let the verifications
run. If all goes correctly, you can download an `.xpi` file with
the new version signed and ready to be installed.

### Chrome extension

First, you need to enable the Developer mode in the configuration 
panel and load the extension as a directory. This is the best
way to make the extension work, so just distribute it as a `.zip`
file.
