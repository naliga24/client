import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: 'y703qvqx',
  dataset: 'production',
  apiVersion: 'v1',
  token:
    'skdKEPmcPzlQBX2pSlqDd3qIf21mbXA64bwKkfP4JH5YxFJSCv6DbiR7EoVbTr6d44oXkFUDU7F2YNAdgrdfQPVGebpnceVRHNlgohhVeckuf91VjPgbxd8UHpoQxJ6cMe0X1zKxijhv6Long0abVtm8KpLCQeMQTMBzf45fyUsFlION18Ky',
  useCdn: false,
})