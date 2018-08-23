import React from "react"
import { Card, CardContent, CardActions, Button, Typography, withStyles } from "@material-ui/core";
import { compose } from "recompose";
import { connect } from "react-redux";
import { changeTodoStatus, removeTodoItem } from "../actions/todoActions"

const styles = {
  card: {
    maxWidth: "80%",
    paddingBottom: "5px",
    margin: "0 auto"
  },
  cardActions: {
    justifyContent: "space-around"
  }
};

const TaskCard = (props) => {
  let { classes, type } = props
  let { name, id } = props;
  return (
    <Card className={classes.card} raised>
      <CardContent>
        <Typography component="p">{name}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        {
          type === "todo" && <Button size="small" color="primary" variant="outlined"
            onClick={() => { props.changeTodoStatus(id, "inprogress") }}>
            In Progress
        </Button>
        }

        {type === "inprogress" && <Button size="small" variant="outlined" color="primary"
          onClick={() => { props.changeTodoStatus(id, "complete") }}>
            Complete
        </Button>
        }
        {type === "complete" && <Button size="small" color="primary" variant="outlined"
          onClick={() => { props.removeTodoItem(id) }}>
          Remove
        </Button>}
      </CardActions>
    </Card>
  )
}

export default compose(
  withStyles(styles),
  connect(state => state, { changeTodoStatus, removeTodoItem })

)(TaskCard);