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
|TonStakers|kQATxwZzdboZiwntEm1gIBPWDYDRsfKWM9odt8SBiwM--IvK|-|
|TsTon Jetton Master|kQBLQCzqBQgqmHiaDXM4E5FVguSkkJQ3BvLyK8elqd668RYC|-|
|Pool Master|kQBsnNWeMJMzIhMrjiH0bFn3d4DG8GwIYbwdTWDrtend1tsO|-|
|Prize Reserve|kQDOflS14wwyNzZtmJ-Flhu-s4ijLwsJLbPMvx5Grv_QT_FL|-|
