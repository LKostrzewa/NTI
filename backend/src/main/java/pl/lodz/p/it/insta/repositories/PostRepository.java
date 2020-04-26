package pl.lodz.p.it.insta.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.lodz.p.it.insta.entities.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
}
