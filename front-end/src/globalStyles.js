import { withStyles } from '@material-ui/core/styles';
// ----------------------------------------------------------------------

const GlobalStyles = withStyles((theme) => ({
  '@global': {
    '*': {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    },
    html: {
      width: '100%',
      height: '100%',
      '-ms-text-size-adjust': '100%',
      '-webkit-overflow-scrolling': 'touch'
    },
    body: {
      width: '100%',
      height: '100%',
    },
    '#root': {
      width: '100%',
      height: '100%'
    },
  }
}))(() => null);

export default GlobalStyles;
