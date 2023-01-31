<!--
SPDX-FileCopyrightText: 2022 Christian Fletcher <mistrustfully@gmail.com>

SPDX-License-Identifier: CC0-1.0
-->

# Contributing

## Installing Dependencies
To contribute to the project, you'll need to install a few dependencies.

- [REUSE](fsf.orghttps://git.fsfe.org/reuse/tool)
- [Node](https://nodejs.org/en/) (LTS or later)
- [Aftman](https://github.com/LPGhatguy/aftman)

### Installing Reuse
Reuse is used to properly license and attribute files. It can be installed via Pip.
```bash
pip install reuse
```

### Installing Node
Node can be installed via your systems package manager, or NVM.
``` bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
source ~/.bashrc
nvm install --lts
nvm use --lts
```

### Installing Aftman
Aftman handles installing tooling for Roblox, like Rojo. It's technically not *required*, but it is recommended.

- Download & Unzip a prebuilt binary from https://github.com/LPGhatguy/aftman/releases
- Run `./aftman self-install`
- Install Aftman Dependencies with `aftman install`

### (Optional) Installing Git Hooks
We have a precommit hook for the project that ensures the code is licensed and doesn't have an issues. It's recommended to install it so you don't accidentally commit broken code.

```bash
./.git-hooks/create-symlinks.sh
```

## Building
Once all the dependencies are installed, building is a relatively simple process.

```bash
npm i
npx roblox-ts build
rojo build --ouput place.rbxl
```

Then, you can open `place.rbxl` in Roblox Studio and it should run fine!

## Contributing Code
todo

## Contributing Assets
You can contribute assets by adding them to their respective folder in [assets](/assets). It's recommended to use [reuse](#installing-reuse) to properly license the asset. We also recommend licensing assets under `GPL-3.0-or-later`.
