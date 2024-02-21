/**
 * This is a sample configuration that can be adapted to your needs.
 */

const nomoCliConfig = {
  deployTargets: {
    production: {
      rawSSH: {
        sshHost: process.env.SSH_TARGET,
        sshBaseDir: "/var/www/production_webons/tokengenerator/",
        publicBaseUrl: "https://tokengenerator.nomo.zone",
        hybrid: true,
      },
    },
  },
};

module.exports = nomoCliConfig;
