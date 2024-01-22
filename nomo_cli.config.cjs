/**
 * This is a sample configuration that can be adapted to your needs.
 */

const nomoCliConfig = {
  deployTargets: {
    production: {
      rawSSH: {
        sshHost: process.env.SSH_TARGET,
        sshBaseDir: "/var/www/production_webons/tokengenerator/",
        publicBaseUrl: "https://w.nomo.app/tokengenerator",
      },
    },
  },
};

module.exports = nomoCliConfig;
