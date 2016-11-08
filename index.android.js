/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  StatusBar,
  TouchableHighlight,
  ActionButton,
  Image
} from 'react-native';
import * as firebase from 'firebase';
const constants = {
  actionColor: '#24CE84'
};
const firebaseConfig = {  
 apiKey: "AIzaSyDH9NaaVLXF6zBzCje2es1pk_6_VmH00LE",
    authDomain: "lamba-ee49f.firebaseapp.com",
    databaseURL: "https://lamba-ee49f.firebaseio.com",
    storageBucket: "lamba-ee49f.appspot.com",
    messagingSenderId: "935763334578"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class lamba extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.itemsRef = this.getRef().child("lambas");
  }

  getRef() {
    return firebaseApp.database().ref();
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        console.log("afsfdasdsadads")
        items.push({
          isOpen: child.val(),
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
          >
        </ListView>

      </View>
    )
  }

  _addItem() {
  
  }

  _renderItem(item) {
    let lampIcon = item.isOpen ? require('./img/yellow-lamp.png') : require('./img/grey-lamp.png');
    return (
      <TouchableHighlight onPress={()=>{
        if(item.isOpen)return;
        this.itemsRef.update({[item._key] : 1});
        setTimeout(()=>{this.itemsRef.update({[item._key] : 0})},5000);
      }}>
        <View style={styles.li}>
          <Image source={lampIcon} />
          <Text style={styles.liText}>{item._key}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
  listview: {
    flex: 1,
  },
  yellow : {backgroundColor : 'yellow'},
  grey : {backgroundColor:'grey'},
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  liContainer: {
    flex: 2,
  },
  liText: {
    color: '#333',
    fontSize: 16,
  },
  navbar: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    justifyContent: 'center',
    height: 44,
    flexDirection: 'row'
  },
  navbarTitle: {
    color: '#444',
    fontSize: 16,
    fontWeight: "500"
  },
  statusbar: {
    backgroundColor: '#fff',
    height: 22,
  },
  center: {
    textAlign: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  action: {
    backgroundColor: constants.actionColor,
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
});

AppRegistry.registerComponent('lamba', () => lamba);
