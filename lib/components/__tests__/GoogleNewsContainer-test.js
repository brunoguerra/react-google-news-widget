import React from 'react';
import GoogleNewsContainer, { api, corsService, Card } from '../GoogleNewsContainer';
import { shallow, mount } from 'enzyme';
import nock from 'nock';

const mockResult = {
  author: "Ivelisse Rivera and Lizette Alvarez",
  title: "Hurricane Irma, Packing 185-M.P.H. Winds, Makes Landfall in Caribbean",
  description: "Among the most powerful storms recorded in the Atlantic Ocean, the storm arrived in the islands with 185 m.p.h. winds, with the eye passing over Barbuda as it headed toward Puerto Rico.",
  url: "https://www.nytimes.com/2017/09/05/us/hurricane-irma-a-category-5-hurricane-heads-for-puerto-rico.html",
  urlToImage: "https://static01.nyt.com/images/2017/09/06/us/06irma4_hp/06irma4_hp-facebookJumbo.jpg",
  publishedAt: "2017-09-06T19:49:40Z"
}

describe('GoogleNewsContainer', () => {
  it('renders without crashing', async (done) => {
    const queryString = 'google-news';
    nock.cleanAll();
    const corsServiceNock = nock(corsService)
      .get(() => true)
      .reply(200, { body: [mockResult] })

    const wrapper = shallow(<GoogleNewsContainer />);
    wrapper.instance().componentWillReceiveProps({ queryString });

    setTimeout(() => {
      expect(corsServiceNock.isDone()).toBeTruthy();
      done();
    }, 0);
  })
  describe('card', () => {
    let target
    beforeEach(() => {
      target = mount(<Card {...mockResult} />);
    })

    it('have result data', () => {
      expect(target.find('.card-title')).toHaveText(mockResult.title)
      expect(target.find({ src: mockResult.urlToImage }).length).toBe(1)
      expect(target.find('p')).toHaveText(mockResult.description)
      expect(target.find('.publishedAt')).toHaveText(
        'Published at: '+mockResult.publishedAt
      )
      expect(target.find('.author')).toHaveText(
        'Published by: '+mockResult.author
      )
      expect(target.find({ href: mockResult.url }).length).toBe(1)
    })

  })
})
