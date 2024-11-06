export const OPCUA_ORGAN_TYPE = "OPCUA_ORGAN_TYPE";

export enum OPCUA_ORGAN_STATES {
	initial = "initial",
	readyToDiscover = "readyToDiscover",
	discovering = "discovering",
	discovered = "discovered",
	readyToCreate = "readyToCreate",
	creating = "creating",
	created = "created",
	error = "error",
	timeout = "timeout",
	cancelled = "cancelled",
	pending = "pending"
}


export enum OPCUA_ORGAN_USER_CHOICE {
	noChoice = "noChoice",
	yes = "yes",
	no = "no"
}