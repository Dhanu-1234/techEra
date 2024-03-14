import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import CourseItem from '../CourseItem'
import FailureView from '../FailureView'
import './index.css'

const resultStatusContants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {coursesList: [], resultStatus: resultStatusContants.initial}

  componentDidMount() {
    this.getCoursesList()
  }

  getCoursesList = async () => {
    this.setState({resultStatus: resultStatusContants.loading})
    const url = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const {courses} = data
      const updatedData = courses.map(eachObj => ({
        id: eachObj.id,
        name: eachObj.name,
        logoUrl: eachObj.logo_url,
      }))

      this.setState({
        coursesList: updatedData,
        resultStatus: resultStatusContants.success,
      })
    } else {
      this.setState({resultStatus: resultStatusContants.failure})
    }
  }

  retry = () => {
    this.getCoursesList()
  }

  renderLodingView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#475569" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {coursesList} = this.state

    return (
      <>
        <h1 className="home-heading">Courses</h1>
        <ul className="courses-list">
          {coursesList.map(eachObj => (
            <CourseItem key={eachObj.id} courseDetails={eachObj} />
          ))}
        </ul>
      </>
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

export default Home
