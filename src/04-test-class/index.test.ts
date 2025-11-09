import { getBankAccount, InsufficientFundsError, SynchronizationFailedError, TransferFailedError } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const balance = 2000;
    const account = getBankAccount(balance);
    expect(account.getBalance()).toEqual(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = 2000;
    const payment = 3000;
    const account = getBankAccount(balance);
    expect(() => account.withdraw(payment)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const balance = 2000;
    const account = getBankAccount(balance);

    const secondBalance = 1000;
    const secondAccount = getBankAccount(secondBalance);

    expect(() => account.transfer(balance + 1000, secondAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const balance = 2000;
    const account = getBankAccount(balance);

    expect(() => account.transfer(balance, account)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const balance = 2000;
    const account = getBankAccount(balance);
    const deposit = 1000;
    const totalBalance = balance + deposit;

    jest.spyOn(account, 'deposit');
    account.deposit(deposit);
    expect(account.getBalance()).toEqual(totalBalance);
    expect(account.deposit).toHaveBeenCalled();
  });

  test('should withdraw money', () => {
    const balance = 2000;
    const account = getBankAccount(balance);
    const deposit = 1000;
    const totalBalance = balance - deposit;

    jest.spyOn(account, 'withdraw');
    account.withdraw(deposit);
    expect(account.getBalance()).toEqual(totalBalance);
    expect(account.withdraw).toHaveBeenCalled();
  });

  test('should transfer money', () => {
    const balance = 2000;
    const secondBalance = 1000;
    const transfer = 500;

    const accountBalance = balance - transfer;
    const secondAccountBalance = secondBalance + transfer;

    const account = getBankAccount(balance);
    const secondAccount = getBankAccount(secondBalance);

    jest.spyOn(account, 'transfer');
    jest.spyOn(account, 'withdraw');
    jest.spyOn(secondAccount, 'deposit');
    account.transfer(transfer, secondAccount);

    expect(account.getBalance()).toEqual(accountBalance);
    expect(secondAccount.getBalance()).toEqual(secondAccountBalance);
    expect(account.transfer).toHaveBeenCalled();
    expect(account.withdraw).toHaveBeenCalled();
    expect(secondAccount.deposit).toHaveBeenCalled();
  });

  test('fetchBalance should return number in case if request did not failed', async () => {

    const balance = 2000;
    const newBalance = 2300;

    const account = getBankAccount(balance);
    jest
      .spyOn(account, 'fetchBalance')
      .mockImplementation(async () => newBalance);

    const result = await account.fetchBalance();

    expect(result).toEqual(newBalance);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = 2000;
    const newBalance = 2300;

    const account = getBankAccount(balance);
    jest
      .spyOn(account, 'fetchBalance')
      .mockImplementation(async () => newBalance);

    await account.synchronizeBalance();

    expect(account.getBalance()).toEqual(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const balance = 2000;
    const account = getBankAccount(balance);
    jest.spyOn(account, 'fetchBalance').mockImplementation(async () => null);

    await expect(() => account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});