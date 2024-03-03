import React, { useState, useEffect } from 'react';
import { Info, ChevronRight } from 'react-feather';
import TabContentComponent from "./TabContentComponent";
import PropTypes from "prop-types";
import profileTabItems from '../../../models/profileTabs';

const TabsComponent = ({ employeeJMBG }) => {
    const [tabs, setTabs] = useState(profileTabItems);
    const [activeTab, setActiveTab] = useState({});

    const setTabAsActive = (selectedTab) => {
        const updatedTabs = tabs.map(item => {
            if (item.id === selectedTab.id) {
                item.active = true;
                return item;
            }
            item.active = false;
            return item;
        });
        const activeTab = updatedTabs.find(tab => tab.active);
        setActiveTab(activeTab);
        setTabs(updatedTabs);
    }

    useEffect(() => {
        setActiveTab(tabs[0]);
    }, []);

    const tabElements = tabs.map(item => (
        <a
            key={item.id}
            className={`list-group-item ${item.active ? 'selectedTab' : ''}`}
            onClick={() => setTabAsActive(item)}
        >
            <Info size="18" /> &nbsp;&nbsp;
            {item.name}
            <ChevronRight size="18" />
        </a>
    ));

    return (
        <div>
            <div className="col-md-4">
                <div className="list-group">
                    {tabElements}
                </div>
            </div>
            <TabContentComponent activeTab={activeTab} employeeJMBG={employeeJMBG} />
        </div>
    );
}

TabsComponent.propTypes = {
    employeeJMBG: PropTypes.string.isRequired,
};

export default TabsComponent;
