# Version Management

This project now includes an improved version management system that replaces the old `update-license.js` script.

## Available Commands

### Manual Version Update

```bash
npm run update-version
```

- Updates version information in source files from `package.json`
- Updates `src/core/FlowPlater.ts` (VERSION, LICENSE, AUTHOR constants)
- Updates `src/licence.js` (copyright year, version references)
- Safe to run multiple times (only updates if changes are needed)

### Automated Version Bumping

```bash
npm run version:patch   # 1.0.0 -> 1.0.1
npm run version:minor   # 1.0.0 -> 1.1.0  
npm run version:major   # 1.0.0 -> 2.0.0
```

These commands will:

1. Update `package.json` with the new version
2. Update all source files with version information
3. Automatically commit the changes to git (if available)
4. Optionally create a git tag with `--tag` flag

### Manual Bump with Options

```bash
node scripts/bump-version.js patch --tag        # Create git tag
node scripts/bump-version.js minor --no-commit  # Don't auto-commit
```

## Features

✅ **Semver validation** - Ensures proper version format  
✅ **Atomic updates** - Updates all files consistently  
✅ **Git integration** - Auto-commits and can create tags  
✅ **Error handling** - Clear error messages and validation  
✅ **Dry-run safe** - Shows what will change before making changes  
✅ **Year updates** - Automatically updates copyright year in license  

## Migration from Old System

The old `update-license.js` script has been replaced with:

- `scripts/update-version.js` - Manual version sync
- `scripts/bump-version.js` - Automated version bumping

The build process now uses `npm run update-version` instead of `npm run update-license`.
