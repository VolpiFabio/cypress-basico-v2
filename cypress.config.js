const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: "q8rdo3", // id do projeto no Cypress Cloud
  viewportWidth: 1280,
  viewportHeight: 1020,
  e2e:{},
  // video:true,
})