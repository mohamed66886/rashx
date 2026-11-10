import ChangelogPage, {
  generateMetadata as generateChangelogMetadata,
  generateStaticParams as generateChangelogStaticParams,
} from '../changelog/page';

export const generateStaticParams = generateChangelogStaticParams;
export const generateMetadata = generateChangelogMetadata;
export default ChangelogPage;

