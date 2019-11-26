import React, { useCallback, useEffect } from "react";
import {
    stylesheet,
    Image,
    TouchableOpacity,
    StatusBar,
    FlatList,
    ScrollView,

} from "react-native";
import {
    Container,
    Header,
    Content,
    Button,
    Icon,
    Text,
    Title,
    Left,
    Right,
    Body,
    Input,
    Item,
    Footer,
    View,
    FooterTab,
    Badge
} from "native-base";
import PropTypes from "prop-types";

import { useSelector, useDispatch } from "react-redux";

import styles from "./styles";
import Style from "../../Theme/Style";

import NavigationService from "../../components/navigation/AppNavigator";

import TextStyles from "helpers/TextStyles";
import strings from "localization";
import getUser from "selectors/UserSelectors";
import { getDetail } from "../../actions/MenuActions";
import { selectDetail } from "../../selectors/MenuSelectors";
import { Card } from "react-native-elements";
import SwipeablePanel from "rn-swipeable-panel";
import numFormat from "../../components/common/numFormat";


function Detail(props) {
    const dispatch = useDispatch();
    const { approval_name, approval_user, approval_id } = props.navigation.state.params.data;
    console.log('props.navigation.state.params.data',props.navigation.state.params.data);
    const user = useSelector(state => getUser(state));
    const detail = useSelector(state => selectDetail(state));

    const getDetails = useCallback(() => dispatch(getDetail(approval_user,approval_id)), [
        dispatch
    ]);

    const getMessage = useCallback(
        () => `${strings.homeMessage} ${user && user.name}`,
        [user]
    );

    useEffect(() => {
        getDetails();
    }, []);

    useEffect(() => {
        if (user !== null) {
            props.navigation.navigate("App");
        }
    });

    return (
        <Container style={Style.bgMain}>
 <Header style={Style.navigation}>
                <StatusBar backgroundColor="#00aeef" animated barStyle="light-content" />

                <View style={Style.actionBarLeft}>
                </View>
                <View style={Style.actionBarMiddle}>
                    <Text style={Style.actionBarText}>{approval_name.toUpperCase()}</Text>
                </View>
                <View style={Style.actionBarRight}>
                    {/* <Button transparent style={Style.actionBtnRight} onPress={() => {
                        NavigationService.navigate('MemberPropertyAdd')
                    }}>
                        <Icon active name='plus' style={Style.actionIcon} type="FontAwesome" />
                    </Button> */}
                </View>
            </Header>

            <Content
                style={styles.layoutInner}
                contentContainerStyle={styles.layoutContent}
            >
                <ScrollView>
                    {detail.map((data, key) => (
                        <TouchableOpacity
                            key={key}
                            style={styles.item}
                            underlayColor="transparent"
                            onPress={() =>
                                props.navigation.navigate("View", { data })
                            }
                        >
                            <View>
                            <View style={styles.itemRow}>
                                        <View style={styles.itemOverview}>
                                            <View>
                                            <Text style={styles.itemEntityName}>{data.entity_name}</Text>
                                                <Text style={styles.itemLocation}>Doc No :  {data.doc_no}</Text>
                                                <Text style={styles.itemLocation}>Staff ID : {data.request_staff_id}</Text>
                                                <Text style={styles.itemLocation}>Dept : {data.request_dept_name}</Text>
                                                <Text style={styles.itemPrice}>Rp.{numFormat(data.amount)}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.itemRight}>
                                            {/* <Text style={styles.itemDate}>{data.doc_date}</Text> */}
                                            <Text style={styles.itemEntity}>{data.entity_cd}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.itemRowIcon}>
                                        <View style={styles.itemLeft}>
                                            <View style={styles.itemBtn}>
                                                <Text style={styles.itemDate}>{data.descs}</Text>
                                            </View>
                                           
                                        </View>
                                       
                                    </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </Content>
        </Container>
    );
}

Detail.navigationOptions = {
    headerTransparent: true,
    headerTintColor: 'white',
    headerTitleStyle: { color: 'white' }
};

export default Detail;
