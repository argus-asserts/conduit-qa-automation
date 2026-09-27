{
  description = "Dev environment for conduit-test-website";

  inputs = {
    # Match whichever nixpkgs branch you already pin in your home-manager
    # flake (e.g. 26.05-darwin) so package versions stay consistent.
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-26.05";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
      {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            nodejs_22      # npm ships bundled with this
            postgresql_16  # gives you psql, pg_ctl, initdb, createdb, etc.
            mariadb    # MySQL-compatible; gives you mysqld, mysql, mysqladmin, mysqldump, etc.
          ];
        };
      });
}