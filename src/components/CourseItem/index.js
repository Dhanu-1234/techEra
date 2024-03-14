import {Link} from 'react-router-dom'
import './index.css'

const CourseItem = props => {
  const {courseDetails} = props
  const {id, name, logoUrl} = courseDetails

  return (
    <li className="course-item">
      <Link to={`/courses/${id}`} className="navigation-link">
        <img src={logoUrl} alt={name} className="logo-styles" />
        <p className="course-name">{name}</p>
      </Link>
    </li>
  )
}

export default CourseItem
