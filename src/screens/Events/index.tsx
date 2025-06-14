import {
  Alert,
  FlatList,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Images } from '../../assets/images';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchData } from '../../Action/DispatchData';
import { reducerType } from '../../Reducer/ReducerType';
import { useFocusEffect } from '@react-navigation/native';
import { getUserToken } from '../../Global/Gconstant';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [userName, setUserName] = useState('Renzo');
  const favouriteEvents = useSelector((state: any) => state.redState.favouriteEvents);
  console.log('favouriteEvents=====:',favouriteEvents)
  const dispatch: any = useDispatch();

  const fetchEventListing = async (token = null) => {
    try {
      const formData = new FormData();

      const headers = token
        ? `Bearer ${token}` // Fixed string interpolation
        : '';

      const response = await fetch(
        'http://3.7.81.243/projects/plie-api/public/api/events-listing',
        {
          method: 'POST',
          headers: {
            Authorization: headers,
          },
        },
      );

      const data = await response.json();

      console.log('EventData', JSON.stringify(data));
      setEvents(data?.data?.events);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch events');
      }

      return data;
    } catch (error: any) {
      console.error('Event listing error:', error.message);
      throw error;
    }
  };

  const toggleLike = (id: any) => {
    setEvents((prevEvents: any) =>
      prevEvents.map((event: any) =>
        event.event_date_id === id
          ? { ...event, isFavorite: !event.isFavorite }
          : event,
      ),
    );
  };

  const onShare = async (message: any) => {
    try {
      const result = await Share.share({
        message: message,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  useEffect(() => {
    getUserToken().then((data:any)=>{
     
      
     fetchEventListing(data?.token)
      .then(data => {
        console.log('Events:', data);
      })
      .catch(err => {
        console.error('Error fetching events:', err.message);
      });
    })
    
  }, []);

  useFocusEffect(
    useCallback(() => {

      // Cleanup function
      return () => {
        console.log('Screen unfocused!');
      };
    }, [])
  );


  const EventCard = ({ item, onToggleLike }: any) => {
    return (
      <View style={styles.card}>
        <Image source={{ uri: item.event_profile_img }} style={styles.image} />
        <View style={styles.content}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={styles.title}>{item.event_name}</Text>
            <Image source={Images.imgRightArrow} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={styles.date}>
              {item.readable_from_date}{' '}
              {item?.rereadable_to_date && -item.readable_to_date}
            </Text>
            <Text style={styles.location}>
              {item.city}, {item.country}
            </Text>
          </View>
          <Text style={styles.price}>
            £{item.event_price_from} - £{item.event_price_to}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View style={styles.tagRow}>
              {item?.keywords?.map((tag: any, index: any) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
            <View style={{ flexDirection: 'row', gap: 5 }}>
              <TouchableOpacity
                onPress={() => {
                  onShare(item.description);
                }}
              >
                <Image source={Images.imgShare} />
              </TouchableOpacity>

              {/* <TouchableOpacity
                onPress={() => {
                  onToggleLike(item.event_date_id);
                  dispatch(dispatchData(item, reducerType.eventList));
                }}
              >
                <Image
                  source={
                    item.isFavorite
                      ? Images.imgHeartLike
                      : Images.imgHeartUnlike
                  }
                />
              </TouchableOpacity> */}
              <TouchableOpacity
  onPress={() => {
    toggleLike(item.event_date_id);
    if (!item.isFavorite) {
      dispatch({ type: reducerType.addToFavourite, data: item });
    } else {
      dispatch({ type: reducerType.removeFromFavourite, data: item });
    }
  }}
>
  <Image
    source={
      item.isFavorite ? Images.imgHeartLike : Images.imgHeartUnlike
    }
/>
</TouchableOpacity>


            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
      <StatusBar barStyle={'dark-content'} />
      <View style={{ backgroundColor: 'white' }}>
        <View
          style={{
            marginHorizontal: 20,
            marginTop: 55,
            marginBottom: 5,
            paddingHorizontal: 15,
          }}
        >
          <Text style={{ fontWeight: '600', fontSize: 26, color: '#0F0F0F' }}>
            Hello {userName}!
          </Text>
          <Text
            style={{
              fontWeight: '400',
              fontSize: 16,
              color: '#0F0F0F',
              marginBottom: 15,
            }}
          >
            Are you ready to dance?
          </Text>
        </View>
      </View>
      {events.length == 0 ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ fontSize: 19, fontWeight: '600' }}>
            Opps! Event list is empty.
          </Text>
        </View>
      ) : (
        <FlatList
          data={events}
          showsVerticalScrollIndicator={false}
          bounces={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <EventCard item={item} onToggleLike={toggleLike} />
          )}
          contentContainerStyle={{ padding: 10, flex: 1, marginTop: 30 }}
        />
      )}
    </View>
  );
};

export default Events;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    alignItems: 'flex-start',
  },
  image: {
    aspectRatio: 1,
    height: 80,
    overflow: 'hidden',
    borderRadius: 8,
    marginRight: 10,
  },
  content: {
    flex: 1,
    gap: 1,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    color: '#181A1F',
    // marginBottom: 4,
  },
  date: {
    color: '#28a745',
    fontSize: 13,
  },
  price: {
    fontSize: 11,
    fontWeight: '500',
    color: '#828282',
  },
  tagRow: {
    flexDirection: 'row',
    marginTop: 4,
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#F5F7FC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 125,
    marginRight: 6,
    // marginTop: 4,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#181A1F',
  },
  location: {
    fontSize: 11,
    color: '#828282',
    fontWeight: '400',
    // marginTop: 4,
  },
  iconColumn: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 8,
  },
});
