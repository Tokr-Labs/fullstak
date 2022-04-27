import {Connection, LAMPORTS_PER_SOL, PublicKey, TransactionInstruction} from "@solana/web3.js";
import {InstructionProtocol} from "../../models/instruction-protocol";
import {createTransferInstruction, getAssociatedTokenAddress} from "@solana/spl-token";
import {USDC_MINT_PUBKEY} from "../../models/constants";

export class DepositLiquidityInstruction implements InstructionProtocol {

    static async with(desitnation: PublicKey, owner: PublicKey, amount: number): Promise<TransactionInstruction> {

        const depositLiquidityInstruction = new DepositLiquidityInstruction(
            desitnation,
            owner,
            amount
        )

        return await depositLiquidityInstruction.build()

    }

    // ============================================================
    // === Internal API ===========================================
    // ============================================================

    constructor(
        private destination: PublicKey,
        private owner: PublicKey,
        private amount: number
    ) {
    }

    async build(): Promise<TransactionInstruction> {

        if (!this.validate()) {
            throw new Error("Instruction parameters are not valid.")
        }

        const source = await getAssociatedTokenAddress(
            USDC_MINT_PUBKEY,
            this.owner
        );

        const instruction = createTransferInstruction(
            source,
            this.destination,
            this.owner,
            this.amount * LAMPORTS_PER_SOL // assumes that liquidity will always come in the form of USDC
        )

        return Promise.resolve(instruction)

    }

    // ============================================================
    // === Private API ============================================
    // ============================================================

    private validate(): boolean {
        return true
    }

}