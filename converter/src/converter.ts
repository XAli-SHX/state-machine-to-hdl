import StateMachine from './models/StateMachine'
import * as fs from 'fs'
import {ParseJsonError} from './exceptions'

function generateVerilog(stateMachine: StateMachine): string {
    const verilogTemplate = fs.readFileSync('verilog-template.v', 'utf8');

    const moduleName = stateMachine.name;
    const clk = stateMachine.clk || 'clk';
    const rst = stateMachine.rst || 'rst';

    let inputSignals = '';
    inputSignals += `  // input signals\n`;
    inputSignals += `  input wire ${clk},\n`;
    inputSignals += `  input wire ${rst},\n`;

    let outputSignals = '  // output signals\n';
    let outputLogic = '    // output logic for each state\n';
    let defaultOutputLogic = '    // default output logic\n';

    for (const state of stateMachine.states) {
        if (state.issue) {
            for (const issueSignal of state.issue) {
                outputSignals += `  output reg ${issueSignal};\n`;
                outputLogic += `      ${state.name.toUpperCase()}: ${issueSignal} = 1;\n`;
                defaultOutputLogic += `      ${issueSignal} = 0;\n`;
            }
        }
    }

    let stateEnum = `  localparam ${stateMachine.states[0].name} = 0;\n`;
    for (let i = 1; i < stateMachine.states.length; i++) {
        const state = stateMachine.states[i];
        stateEnum += `  localparam ${state.name} = ${i};\n`;
    }

    let stateLogic = '';
    for (const state of stateMachine.states) {
        stateLogic += `    ${state.name}: ns = ${state.to.length > 0 ? state.to[0].name : stateMachine.states[0].name};\n`;
    }

    const verilogCode = verilogTemplate
        .replace('<<moduleName>>', moduleName)
        .replace('<<inputSignals>>', inputSignals)
        .replace('<<outputSignals>>', outputSignals)
        .replace('<<stateEnum>>', stateEnum)
        .replace('<<clk>>', clk)
        .replace('<<rst>>', rst)
        .replace('<<initialState>>', stateMachine.states[0].name)
        .replace('<<stateLogic>>', stateLogic)
        .replace('<<outputLogic>>', outputLogic)
        .replace('<<defaultOutputLogic>>', defaultOutputLogic);

    return verilogCode;
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
