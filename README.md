# TACT template project

This project has ready to use TACT compiler, typescript + jest with [tact-emulator](https://github.com/tact-lang/tact-emulator), example how to do tests.

```bash
yarn test # To test contract
yarn build # To build contract
yarn deploy # To deploy contract
```
## Deployment

To deploy contract you should:

1) Specify `contract.tact` that will be used as entry point of your contract
2) Configure `contract.deploy.ts` according to your `contract.tact` to generate a deployment link. In particular, it is necessary to correctly call the Init() function from the contract.

If you renamed `contract.tact` to something else, you need to update `tact.config.json` correspondingly. For more information , see [Tact Documentation](https://docs.tact-lang.org/language/guides/config)
## Testing

Example of contract tests are in `contract.spec.ts`. For more information about testing, see [Tact Documentation](https://docs.tact-lang.org/language/guides/debug)

To add new test files to contract you should create `*.spec.ts` files similar to template's one and they would be automatically included in testing.

## Licence

MIT

## Tontogether Deployments

||testnet|mainnet|
|-|-|-|
|TonStakers|kQDpB9FoXA1Bcr7DtQ5oWtLrAgtDEAez4ZRQyGUA7vqiNwc9|-|
|TsTon Jetton Master|kQDy5FWLkA-THNO8VNMD8MJoEI4vBfdaEAlSOtrsAeAN6l0B|-|
|Pool Master|kQAwK9SJpnWhG17ovP2V3xO8ZK9JE6rV86tKJ53Cvxo3xdNL|-|
|Prize Reserve|kQB9GkP7HWZ4TO1-ol8uZfEWw9xcxW0nRnp3NeDLgqD35Uyi|-|
