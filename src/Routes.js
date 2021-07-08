import React from 'react';
import { Switch, Route } from "react-router-dom";
import Discussion from './Discussion/Discussion';
import DiscussionLanding from './Discussion/DiscussionLanding';


function Routes() {
    return (
        <Switch>
            <Route path="/card/:id">
                <Discussion/>
            </Route>
            <Route exact path="/">
                <DiscussionLanding/>
            </Route>
        </Switch>
    )
}

export default Routes
