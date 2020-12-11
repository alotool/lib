# CONTACT-US-BTN

### Publish package to NPM package registry
```shell script
npm login
npm publish --access public
```

### Unpublishing a single version of a package
```shell script
npm unpublish <package-name>@<version>
```

### Unpublishing an entire package
```shell script
npm unpublish <package-name> -f
```