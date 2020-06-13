package pl.lodz.p.it.insta.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.lodz.p.it.insta.entities.ForumPost;

public interface ForumPostRepository extends JpaRepository<ForumPost, Long> {
}

