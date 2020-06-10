import React from 'react';

import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import TripItem from '../src/components/TripItem';
import { MemoryRouter } from 'react-router-dom';

export default {
  title: 'tripItem',
  // component: Trip_1
};

// Link 컴포넌트 일 땐 MemoryRouter로 감싸기
export const Trip_1 = () => (
  <MemoryRouter>
    <TripItem
      tripInfo={{
        id:'5ed904eae5a35e8cad4b7a48',
        title:'123',
        memo:'testtest',
        country: {
          id:"390",
          name:"가나",
          en:"Ghana",
          imgUrl:"http://www.0404.go.kr/imgsrc.mofa?atch_file_id=FILE_000000000010504&file_sn=1",
          country:"가나",
          currency: {
            ko:"세디",
            en:"GHS",
            rate:"212.1682"
          }
        },
        imageUrl:'http://static.hubzum.zumst.com/hubzum/2018/10/18/16/189e444ee9114cb9ba0271f6fc09af32_780x0c.jpg',
        startDate:'Wed Jun 03 2020',
        endDate:'Wed Jun 10 2020',
        status:''
      }}
      layoutType={'type_1'}
    />
  </MemoryRouter>
);

Trip_1.stroy = {
  name: 'type1'
}


export const Trip_2 = () => (
  <MemoryRouter>
    <TripItem
      tripInfo={{
        id:'5ed904eae5a35e8cad4b7a48',
        title:'123',
        memo:'testtest',
        country: {
          id:"390",
          name:"가나",
          en:"Ghana",
          imgUrl:"http://www.0404.go.kr/imgsrc.mofa?atch_file_id=FILE_000000000010504&file_sn=1",
          country:"가나",
          currency: {
            ko:"세디",
            en:"GHS",
            rate:"212.1682"
          }
        },
        imageUrl:'http://static.hubzum.zumst.com/hubzum/2018/10/18/16/189e444ee9114cb9ba0271f6fc09af32_780x0c.jpg',
        startDate:'Wed Jun 03 2020',
        endDate:'Wed Jun 10 2020',
        status:''
      }}
      layoutType={'type_2'}
    />
  </MemoryRouter>
);

Trip_2.stroy = {
  name: 'type2'
}
