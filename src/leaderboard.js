import React from 'react';
import Modal from 'react-responsive-modal';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class LeaderBoard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    };
  }

  onOpenModal () {
    this.setState({open: true});
  };

  onCloseModal () {
    this.setState({open: false});
  };

  render () {
    return (
      <div>
        <button onClick={this.onOpenModal.bind(this)}>Leaderboards</button>
        <br/>
        <br/>
        <Modal open={this.state.open} onClose={this.onCloseModal.bind(this)} little>
          <br/>
          <Tabs>
            <TabList>
              <Tab>Top Scores</Tab>
              <Tab>Most Cheese</Tab>
            </TabList>

            <TabPanel>
              <ol>
                {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((item, i)=> {
                  return (<li key={i}>Andrew - {item}</li>)
                })}
              </ol>
            </TabPanel>
            <TabPanel>
              <ol>
                {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((item, i)=> {
                  return (<li key={i}>Andrew - {item}</li>)
                })}
              </ol>
            </TabPanel>
          </Tabs>
        </Modal>
      </div>
    )
  }
}

export default LeaderBoard;
