import {DaoFundStrategy, DaoFundStrategyType} from "../dao-fund-strategy";

test("strategy is instantiated corretly", () => {

    const strategy = DaoFundStrategy.with(DaoFundStrategyType.valueAdd);

    expect(strategy.type).toEqual(DaoFundStrategyType.valueAdd);
    expect(strategy.description).toEqual("Value-Add");

});