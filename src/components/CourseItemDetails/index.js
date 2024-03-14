import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import FailureView from '../FailureView'
import './index.css'

const resultStatusContants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CourseItemDetails extends Component {
  state = {courseDetails: {}, resultStatus: resultStatusContants.initial}

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({resultStatus: resultStatusContants.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const courseDetails = data.course_details
      const updatedDetails = {
        id: courseDetails.id,
        name: courseDetails.name,
        description: courseDetails.description,
        imageUrl: courseDetails.image_url,
      }

      this.setState({
        courseDetails: updatedDetails,
        resultStatus: resultStatusContants.success,
      })
    } else {
      this.setState({resultStatus: resultStatusContants.failure})
    }
  }

  retry = () => {
    this.getCourseDetails()
  }

  renderLodingView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#475569" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {courseDetails} = this.state
    const {name, description, imageUrl} = courseDetails

    return (
      <div className="success-view-container">
        <div className="course-card">
          <div className="img-container">
            <img src={imageUrl} alt={name} className="course-img" />
          </div>
          <div className="course-description-container">
            <h3 className="course-title">{name}</h3>
            <p className="course-description">{description}</p>
          </div>
        </div>
      </div>
    )
  }

  getResults = () => {
    const {resultStatus} = this.state
    let result
    switch (resultStatus) {
      case resultStatusContants.loading:
        result = this.renderLodingView()
        break
      case resultStatusContants.success:
        result = this.renderSuccessView()
        break
      case resultStatusContants.failure:
        result = <FailureView retry={this.retry} />
        break
      default:
        result = null
        break
    }
    return result
  }

  render() {
    return (
      <div>
        <Header />
        {this.getResults()}
      </div>
    )
  }
}

export default CourseItemDetails
