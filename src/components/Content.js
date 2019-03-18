import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
//import pages
import Dashboard from '../components/pages/Dashboard';
import Kehadiran from '../components/pages/Kehadiran';
import Perkembangan from '../components/pages/Perkembangan';
import Pembayaran from '../components/pages/Pembayaran';


class Content extends Component {
    render() {
        return (
            <content>
            {/* <Switch> */}
                <Route exact path='/' component={Dashboard} />
                <Route path ='/kehadiran' component={Kehadiran} />
                <Route path ='/perkembangan' component={Perkembangan} />
                <Route path ='/pembayaran' component={Pembayaran} />
            {/* </Switch> */}
            </content>
        );
    }
}

export default Content;