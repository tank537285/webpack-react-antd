/**
 * Created by admin on 2017/9/18.
 * https://www.jetbrains.com/help/webstorm/file-template-variables.html
 */
import { connect } from 'react-redux'
import { setVisibilityFilter } from '../action/actions'
import Link from '../components/Link'

const mapStateToProps = (state, ownProps) => {
    return {
        active: ownProps.filter === state.visibilityFilter
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(setVisibilityFilter(ownProps.filter))
        }
    }
}

const FilterLink = connect(
    mapStateToProps,
    mapDispatchToProps
)(Link)

export default FilterLink;
