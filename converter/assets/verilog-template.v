module <<moduleName>> (
<<inputSignals>>
<<outputSignals>>
);

  // State enumeration
<<stateEnum>>

  // State register
  always @(posedge <<clk>> or posedge <<rst>>) begin
    if (<<rst>>) begin
      ps <= <<initialState>>;
    end else begin
      ps <= ns;
    end
  end

  // Next state logic
  always @(*) begin
    case (ps)
<<stateLogic>>
    default:
      ns = <<initialState>>;
    endcase
  end

  // issue output signals
  always @(*) begin
<<defaultOutputLogic>>
    case (ps)
<<outputLogic>>
    default:
<<defaultOutputLogic>>
    endcase
  end

endmodule
