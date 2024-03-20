import { Action, State, _q_returns } from "../types";
import _ownerToAddress from "../utils/pubtoid";
declare const ContractError: new (arg0: string) => any;
/**
 * Check if the user exists based on the provided public key.
 *
 * @param {Action} action - the action object containing input data
 * @param {State} state - the current state of the system
 * @return {Promise<_q_returns>} an object with the result status and data
 */
export default async function check_user(
  action: Action,
  state: State
): Promise<_q_returns> {
  if (action.input.pubKey && action.input.pubKey.length > 0) {
    const address = await _ownerToAddress(action.input.pubKey, state);
    if (state.user[address] !== undefined) {
      return { result: { status: 1, data: state.user[address] } };
    } else {
      return { result: { status: 0, data: "User is not register" } };
    }
  } else {
    throw new ContractError("PubKey is missing");
  }
}
