export const listenToKill = () => {
  process.on('uncaughtException', e => {
    // tslint:disable-next-line:no-console
    console.log(e);
    process.exit(1);
  });

  process.on('unhandledRejection', e => {
    // tslint:disable-next-line:no-console
    console.log(e);
    process.exit(1);
  });
};
