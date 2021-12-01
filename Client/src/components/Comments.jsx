import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Rating from "@mui/material/Rating";

export default function ControlledAccordions(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        sx={{ position: "relative", left: "0px", width: "675px" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "70%", flexShrink: 0 }}>
            Comment from {props.user}
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            <Rating
              sx={{ marginTop: 0, marginLeft: -0.3 }}
              size="medium"
              value={props.rating}
              precision = {0.5}
              readOnly
            />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography display="block">{props.content}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
