import OfferingToken from '../components/offering_token'
import CategoryToken from '../components/category_token'
import PropTypes from 'prop-types'
import { Form } from 'reframe'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'Suggest an Attraction',
      method: 'post',
      action: '/api/eatfresh/attractions',
      onCancel: this._handleCancel.bind(this),
      onSuccess: this._handleSuccess.bind(this),
      sections: [
        {
          instructions: 'Thank you for your interest in Eat Fresh WNY! Please enter the details of your suggested attraction to add it to our database!',
          fields: [
            { label: 'Your Name', name: 'contact_name', type: 'textfield', required: true },
            { label: 'Your Email', name: 'contact_email', type: 'textfield', required: true },
            { label: 'Your Phone', name: 'contact_phone', type: 'textfield', required: true }
          ]
        }, {
          fields: [
            { label: 'Name of Attraction', name: 'title', type: 'textfield', required: true },
            { label: 'Categories', name: 'category_ids', type: 'lookup2', required: true, multiple: true, endpoint: '/api/eatfresh/categories', value: 'id', text: 'title', format: CategoryToken },
            { label: 'Offerings', name: 'offering_ids', type: 'lookup2', required: true, multiple: true, endpoint: '/api/eatfresh/offerings', value: 'id', text: 'title', format: OfferingToken },
            { label: 'Address 1', name: 'address_1', type: 'textfield', required: true },
            { label: 'Address 2', name: 'address_2', type: 'textfield' },
            { label: 'City', name: 'city', type: 'textfield', required: true },
            { label: 'State', name: 'state', type: 'textfield', required: true },
            { label: 'Zip', name: 'zip', type: 'textfield', required: true },
            { label: 'County', name: 'county_id', type: 'lookup', required: true, endpoint: '/api/eatfresh/counties', value: 'id', text: 'name' },
            { label: 'Phone', name: 'phone', type: 'textfield', required: true },
            { label: 'Hours of Operation', name: 'hours_of_operation', type: 'textfield', required: true },
            { label: 'Website', name: 'website', type: 'textfield' },
            { label: 'Facebook', name: 'facebook', type: 'textfield' },
            { label: 'Cage Free / Pasture Raised', name: 'is_free_range', type: 'checkbox' },
            { label: 'Family Friendly', name: 'is_family_friendly', type: 'checkbox' },
            { label: 'Family Owned', name: 'is_family_owned', type: 'checkbox' },
            { label: 'Handicap Accessible', name: 'is_accessible', type: 'checkbox' },
            { label: 'Military Discount', name: 'is_military', type: 'checkbox' },
            { label: 'Organic / USDA Organic', name: 'is_organic', type: 'checkbox' },
            { label: 'Senior Discount', name: 'is_senior', type: 'checkbox' },
            { label: 'Vegetarian / Vegan', name: 'is_vegetarian', type: 'checkbox' }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(result) {
    this.context.router.history.push('/thankyou')
    this.context.modal.close()
  }

}

export default New
