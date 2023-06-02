import StateMachine from './models/StateMachine'
import * as fs from 'fs'
import {ParseJsonError} from './exceptions'

function generateVerilog(stateMachine: StateMachine): string {

}


function convert(jsonFilePath: string): string {
    try {
        const data = fs.readFileSync(jsonFilePath, 'utf8');
        const stateMachine = JSON.parse(data);
        return generateVerilog(stateMachine);
    } catch (err) {
        throw new ParseJsonError(`Error converting JSON to Verilog: ${err}`);
    }
}
